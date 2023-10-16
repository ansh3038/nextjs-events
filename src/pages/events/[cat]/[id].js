import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css'

export default function EventsPage({data}){

    const inputEmail = useRef();
    const router = useRouter();
    const [message,setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const emailValue = inputEmail.current.value;
        const eventId = router?.query.id;
    
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
        if (!emailValue.match(validRegex)) {
          setMessage('Please introduce a correct email address');
        }
    
        try {
          const response = await fetch('/api/email-registration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailValue, eventId }),
          });
    
          if (!response.ok) throw new Error(`Error: ${response.status}`);
          const data = await response.json();
          setMessage(data.message);
          inputEmail.current.value = '';
        } catch (e) {
          console.log('ERROR', e);
        }
      };

      
    return (
        <div className='eventPage container text-center '>
            <h2 className='text-center p-3'>{data.title}</h2>
            <Image src ={data.image} width={500} height={400} alt={data.title} className='mt-2'></Image>
            <p className='m-3'> {data.description}</p>
            <form onSubmit={onSubmit} className='email_registration'>
                <input type='email' ref={inputEmail}></input>
                <input type='submit'></input>
            </form>
            <p>{message}</p>
        </div>
    );


}

export async function getStaticPaths(){
    const data = await import('../../../../data/data.json');
  const allEvents = data.allEvents;

  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    };
  });

    return {
        paths: allPaths,
        fallback: false
    };

}

export async function getStaticProps(context){
    const id = context.params.id;
    const {allEvents} = await import('../../../../data/data.json');
    const eventData = allEvents.find((ev) => id === ev.id);

    return {
        props: {
            data:eventData
        }
    }

}