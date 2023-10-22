import slugify from 'slugify'

export const slug = (name: string): string =>{
    return slugify(name, {lower:true}).replace(/[^\w\-]+/g,'');
}