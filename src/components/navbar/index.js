import "@nodemodules/bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link'

export default function Navbar() {
    return <>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/events">Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/about-us">About Us</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</>

}