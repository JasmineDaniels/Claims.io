export default function Footer() {
    return (
        <>
            <footer className="text-center border-top border-danger">

                <div className="container">

                    {/* <!-- Section: Text --> */}
                    <section className="pt-2">
                        <h5>
                            Contact Us
                        </h5>
                    </section>

                    {/* <!-- Section: Social media --> */}
                    <section className="mb-2">

                        {/* <!-- Google --> */}
                        <a className="btn btn-outline-dark btn-floating m-1" href="mailto:create.jasminedaniels@gmail.com" role="button"
                        ><i className="fab fa-google" />
                        </a>

                        <a className="btn btn-outline-dark btn-floating m-1" href="https://jasminedaniels.github.io/Portfolio-02/" role="button"
                        ><i className="fa fa-globe" aria-hidden="true" />
                        </a>

                        {/* <!-- Linkedin --> */}
                        <a className="btn btn-outline-dark btn-floating m-1" href="https://www.linkedin.com/in/jasmine-daniels-3a15a1235/" role="button"
                        ><i className="fab fa-linkedin-in" />
                        </a>

                        {/* <!-- Github --> */}
                        <a className="btn btn-outline-dark btn-floating m-1" href="https://github.com/JasmineDaniels" role="button"
                        ><i className="fab fa-github" />
                        </a>
                    </section>

                </div>


                {/* <!-- Copyright --> */}

            </footer>
        </>
    )
}