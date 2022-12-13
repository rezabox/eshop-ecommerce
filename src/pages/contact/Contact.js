import React, { useRef } from "react";
import Card from "../../components/card/Card";
import emailjs from "@emailjs/browser";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import styles from "./Contact.module.scss";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_jqd7xxe",
        "template_6kbcq7b",
        form.current,
        "wsZ2TtVela5Wma8lu"
      )
      .then(
        (result) => {
          toast.success('Message sent successfully');
        },
        (error) => {
         toast.error(error.text);
        }
      );
      e.target.reset();
  };
  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="text"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className="icon">
                <span>
                  <FaPhoneAlt size={22} />
                  <p>+234 705 141 6545</p>
                </span>
                <span>
                  <FaEnvelope size={22} />
                  <p>Support.eshop@gmail.com</p>
                </span>
                <span>
                  <GoLocation size={22} />
                  <p>Ahvaz , Iran</p>
                </span>
                <span>
                  <FaTwitter size={22} />
                  <p>@RezaAsareh</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
