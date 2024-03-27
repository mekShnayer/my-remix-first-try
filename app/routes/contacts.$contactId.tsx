import { useOutletContext, useParams } from "@remix-run/react";

export default function aboutMe() {
    const params = useParams()
    const id = params.contactId
    return <div>
        <h1>Hello {params.id}!</h1>
        <p>It's so great trying new things!</p>
    </div>
}


