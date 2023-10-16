import Link from 'next/link';
import Image from 'next/image';
import style from '../../../components/styles/common.module.css'
export default function EventPage({data,pageName}){

    return(
        <>
        <div className='eventplace container'> 
        <h2 className='text-center'>Event in {pageName}</h2>
        </div>
        <div className='content container'>
            {
                data.map((ev) => {
                    return (<>
                    <Link href={`/events/${ev.city}/${ev.id}`} key={ev.id} passHref className={`row p-5 mt-2 ${style.textlink}`}>
                    <Image src ={ev.image} alt={ev.title} width='600' height={400} className='col-6'></Image>
                    <div className='col-5 p-5 mt-5'>
                    <h4>{ev.title}</h4>
                    <p>{ev.description}</p>
                    </div>
                    </Link>
                    </>
                    )
                })
            }
        </div>
        </>
    )


}

export async function getStaticPaths(){
    const { events_categories } = await import('../../../../data/data.json');
    const allPaths = events_categories.map( (ev) => {
        return {    
            params:{
                cat: ev.id.toString(),
            }
        };
    });
    return (
        {
            paths: allPaths,
            fallback: false
        }
    )
}
export async function getStaticProps(context){
    const id = context?.params.cat;
    const { allEvents } = await import('../../../../data/data.json');

    const data = allEvents.filter((ev) => (ev.city===id));

    return {
        props:{
            data: data,
            pageName : id,
        }
    }
}