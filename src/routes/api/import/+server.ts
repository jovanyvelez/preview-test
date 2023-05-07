export const POST = async ({request}):Promise<unknown> => {
    
    const temporal = JSON.stringify(await request.json());
  
    console.log (temporal)
  
    return new Response(
      JSON.stringify({success:'Ok Muchacho', resultado: 'todo muy bien'}),
        { status:201 }
    )
  }