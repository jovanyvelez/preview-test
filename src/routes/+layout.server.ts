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
                    nombre: true,
                    telefono: true,
                    email:true,
                    tipoDoc:true,
                    numDoc:true,
                    Departamento:true,
                    Ciudad:true,
                    direccion:true,
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

