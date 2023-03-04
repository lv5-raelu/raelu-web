import { NextApiRequest, NextApiResponse } from "next";

const apiServer = "https://beta.pokeapi.co/graphql/v1beta";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const pokeapiRes = await fetch(`${apiServer}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: req.body,
            cache: "no-store",
        });

        const data = await pokeapiRes.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message: "Third Party API Servers Not Responding",
        });
    }
}
