import { NextApiRequest, NextApiResponse } from "next";

const apiServer = "https://beta.pokeapi.co/graphql/v1beta";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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
}
