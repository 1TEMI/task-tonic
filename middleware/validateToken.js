import jwt from 'jsonwebtoken'
import user from '../models/userModel.js'

export const checkAndRenewToken = (req, res, next) =>{

    const accessToken = req.cookies.access;
    const refreshToken = req.cookies.refresh;


    console.log('Access token =>', accessToken)
    console.log('Refresh token =>', refreshToken)

    //Checking for a valid token
    if(!accessToken){ //Check if the refresh token is valid
        if(!refreshToken){ //Do something
            return res.status(403).json({
                success: false,
                message: 'Session Expired'
            })
        }else{//verify the available access token
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async(error, decoded)=>{
                    if(error){
                        return res.status(403).json({
                            success: false,
                            message: 'Invalid Token'
                        })
                    }else{
                        const validUser = await user.findById(decoded?.access2).exec()
                        //Check if User is valid
                        if(!validUser){
                            return res.status(403).json({
                                success: false,
                                message: 'Invalid User'
                            })
                        }
                        console.log('The valid user',validUser)

                        //Generate new token if user is valid
                        const newAccessToken = jwt.sign({
                            access1: validUser?._id
                        },
                            process.env.ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: process.env.ACCESS_TIME_EXPIRATION
                            }
                        )
                        console.log('The new access token=>', newAccessToken)

                        res.cookie("access", newAccessToken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "none",
                            maxAge: 30 * 1000,
                        });

                        //Assign all the data except password
                        const { password, ...rest } = validUser._doc;

                        req.user = rest;
                        next();
                    }//End
                }//End of Verifying Token async
            )

        }//End of - if no access token

    }else{
        //Do that
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async(error, decoded) => {
            if (error) {
                return res.status(403).json({
                success: false,
                message: "Invalid token",
            });

            } else {
            const validUser = await user.findById(decoded?.access1).exec();

                if (!validUser) {
                    return res.status(404).json({
                    success: false,
                    message: "Invalid User",
                    });
                }

            const { password, ...rest } = validUser._doc;
            req.user = rest;
            next();
            }
        })
    }
}



/////////////
