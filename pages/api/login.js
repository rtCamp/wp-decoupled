import axios from 'axios';
import * as https from 'https';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios({
                method: 'POST',
                url:
                    process.env.NEXT_PUBLIC_WOO_SITE_URL +
                    '/wp-json/jwt-auth/v1/token/' +
                    `?username=${req.query.username}&password=${req.query.password}`,
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            res.status(200).json(response.data);
        } catch (err) {
            console.log(err.response);
            res.status(err.response.data.data.status).json(err.response.data);
        }
    } else {
        res.status(500).json({ error: 'Method not allowed' });
    }
}
