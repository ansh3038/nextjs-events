import Navbar from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.css'
import style from '../../components/styles/common.module.css';
export default function Events({data}){
    return (
        <>
        <div className="container row">
            {
                data?.map( (ev) => {
                    return (
                       <Link href={`/events/${ev.id}`} key={ev.id} passHref className={`row ${style.textlink} col-4 mx-auto`}>
                            {console.log(ev.id)}
                          <Image src={ev.image} alt={ev.title} width='600' height='400' className=" "></Image>
                          <h3 className={`text-center ${style.mtn5}`}>{ev.title}</h3>
                       </Link> 
                    );
                })  
            }
        </div>
        </>    
    
    )

}

export async function getStaticProps(){
    const { events_categories } =  await import('../../../data/data.json');
    return {
        props:{
            data: events_categories,
        }
    };
}