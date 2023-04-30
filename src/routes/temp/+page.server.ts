import { prisma } from '$lib/server/prisma';

export const load = async ({request}) => {
    
    const categories = await prisma.category.findMany({
        where:{padreId:null},

        select:{
            id:true,
            name:true,
            hijos:{
                select:{
                    id:true,
                    name:true,
                    hijos:{
                        select:{
                            id:true,
                            name:true,
                            hijos:true
                        }
                    }
                }          
            }
        }
    });
    
      await prisma.$disconnect();
      
      return { categories }

    
}

