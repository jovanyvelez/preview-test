import { prisma } from '$lib/server/prisma';

export const load = async ( {locals} ) => {

    const { user } = await locals.auth.validateUser();

    try {
        if(user){
            const cliente = await prisma.usuario.findMany({
                where:{
                    email:user.email
                },
                select:{
                    id:true,
                    name: true,
                    phone: true,
                    email:true,
                    docType:true,
                    numDoc:true,
                    Departament:true,
                    city:true,
                    address:true,
                    zone:true,
                    role:{
                        select:{
                            name:true
                        }
                    }
                }
            })

            return {user:cliente}
        }
    
        return {user}	
        
    } catch (error) {
        console.log(error)
    }
};

