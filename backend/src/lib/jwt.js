import jwt from 'jsonwebtoken'

/**
 * Generates a new JWT token and sets it as a cookie on the response object
 * @param {string} userId - The ID of the user
 * @param {Response} res - The response object
 * @returns {string} The generated JWT token
 */
export const generateToken = (userId, res) => {

    // Generate a new JWT token with a payload containing the user ID
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '3d' })

    // Set the JWT token as a cookie on the response object
    res.cookie('jwt', token, {

        // Set the max age of the cookie to 3 days
        maxAge: 3 * 24 * 60 * 60 * 1000,

        // Set the cookie to be http only, meaning it can only be accessed by the server
        httpOnly: true,

        // Set the cookie to be secure, meaning it can only be sent over https
        secure: process.env.NODE_ENV !== 'development',

        // Set the cookie to be same site, meaning it can only be sent from the same origin
        sameSite: 'strict',
    })

    // Return the generated JWT token
    return token
}
