import React, {useState} from "react"

const mutation = `mutation insertUser($email: String!) {
  insert_users_one(object: {email: $email}) {
    id
  }
}`

// markup
const IndexPage = () => {
  const [email, setEmail] = useState('');
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('Submit button clicked');
    const response = await fetch('https://gatsby-func.hasura.app/v1/graphql', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: mutation,
        variables: { email }
      })
    });

    const finalResp = await response.json();
    console.log(finalResp);
  }
  return (
    <main>
      <title>Home Page</title>
      Hasura + Gatsby
      <form onSubmit={submitHandler}>
      <input onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
      <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default IndexPage
