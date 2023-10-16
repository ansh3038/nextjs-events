import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css'
import style from '../components/styles/common.module.css'
export default function Home({data}) {
  return (
    <div className='container'>
      {
        data?.map((ev)=>{
          return (
          <Link key={ev.id} ref={`/events/${ev.id}`}  passHref className={`row p-5  ${style.textlink}`}>
          <Image src={ev.image} alt = {ev.title} width='600' height='400' className='col-6'></Image>
          <div className='col-4 text-center vertical-center p-5 mt-5 ' >
            <h3>{ev.title}</h3>
            <p>{ev.description}</p>
          </div>
          </Link>)
        })
      }
    </div>            
  );
}


export async function getServerSideProps(){
  const {events_categories} = await import('../../data/data.json');
  return {
    props:{
      data: events_categories,
    }
  };
}
