import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <main>
        <section className="py-5">
          <div className="container">
            <div className="row align-items-center justify-content-center text-center">
              <div className="col-md-6">
                <h1 className="fs-1 fw-bold">MedLab</h1>
                <p className="lead fs-5">
                  Automating Pathology Report Generation. Empower your lab with
                  efficiency, accuracy, and seamless report generation.
                </p>
                <Link to="/signup" className="btn btn-primary">
                  Start Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="pb-5">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="fs-3 fw-bold">Features of MedLab</h2>
              <p className="text-secondary">
                Streamline pathology reporting with our advanced tools and
                secure data management.
              </p>
            </div>
            <div className="row gy-4">
              <div className="col-md-4">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">User Authentication</h5>
                    <p className="text-secondary">
                      Secure login system ensuring only authorized access for
                      lab technicians.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">
                      Automated PDF Reports
                    </h5>
                    <p className="text-secondary">
                      Effortlessly generate and customize pathology reports in
                      professional PDF formats.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">Scalable Platform</h5>
                    <p className="text-secondary">
                      A system designed to grow with your lab's increasing
                      needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary text-light py-4 mt-5">
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-md-4">
              <h5 className="fw-bold">About MedLab</h5>
              <p className="mt-2 lh-sm">
                MedLab simplifies pathology report generation and secure data
                sharing for small to mid-tier labs.
              </p>
            </div>
            {/* Quick Links Section */}
            <div className="col-md-4">
              <h5 className="fw-bold">Quick Links</h5>
              <ul className="list-unstyled mt-2">
                <li>
                  <Link to="/" className="text-light text-decoration-none">
                    Home
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    to="/features"
                    className="text-light text-decoration-none"
                  >
                    Features
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    to="/contact"
                    className="text-light text-decoration-none"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    to="/privacy"
                    className="text-light text-decoration-none"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* Contact Section */}
            <div className="col-md-4">
              <h5 className="fw-bold">Contact Us</h5>
              <p className="mt-2">
                <strong>Email:</strong> info@medlab.com
              </p>
            </div>
          </div>
          <hr className="bg-light" />
          <div className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} MedLab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
