import "./Contact.css";
import { Form } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
// export const contactData = async ({ request }) => {
//   try {
//     const formData = await request.formData();
//     // console.log(res);
//     const data = Object.fromEntries(formData.entries());
//     console.log(data);
//     return null;
//   } catch (error) {
//     console.log(error);
//   }
// };
const Contact = () => {
  return (
    <>
      <h1>Get in touch with us:</h1>
      <div className="container">
        <div className="form-container">
          <form method="POST" action="https://formspree.io/f/mjkwbnda">
            <div className="inputs">
              <div>
                <label htmlFor="username"></label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="your name"
                  required
                />
                <label htmlFor="email"></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you email address"
                />
              </div>
              <label htmlFor="message"></label>
              <textarea
                type="text"
                name="message"
                id="message"
                placeholder="message"
                rows="10"
                cols="60"
              />
            </div>
            <button className="msg-btn">Send Message</button>
          </form>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.7837688733293!2d76.84225877470828!3d30.58364897465648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fbf63724c5801%3A0xcaa5de8e8514683c!2sR.%20Burger&#39;s%20Cafe!5e0!3m2!1sen!2sin!4v1738737540904!5m2!1sen!2sin"
            // width="500"
            // height="400"
            // style="border:0;"
            // allowfullscreen=""
            // loading="lazy"
            // referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
