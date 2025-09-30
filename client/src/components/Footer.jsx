import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-gray-200 py-10">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
    <div className="footer_left">
      <h1 className="text-3xl font-bold text-blue-500 mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>RENTIFY</h1>
      <p className="text-gray-400 mb-6">Providing quality rental services for over a decade. Your satisfaction is our priority.</p>
    </div>

    <div className="footer_center">
      <h3 className="text-xl font-semibold text-white mb-4">Useful Links</h3>
      <ul className="space-y-3">
        <li className="hover:text-white transition-colors duration-300 cursor-pointer">About Us</li>
        <li className="hover:text-white transition-colors duration-300 cursor-pointer">Terms and Conditions</li>
        <li className="hover:text-white transition-colors duration-300 cursor-pointer">Return and Refund Policy</li>
      </ul>
    </div>

    <div className="footer_right">
      <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
      <div className="flex items-center mb-4">
        <FaPhone className="mr-3 text-blue-500" />
        <p className="text-gray-400">+1 234 567 890</p>
      </div>
      <div className="flex items-center mb-6">
        <FaEnvelope className="mr-3 text-blue-500" />
        <p className="text-gray-400">rentify@support.com</p>
      </div>
      <img src="/assets/payment.png" alt="payment" className="w-full md:w-3/4" />
    </div>
  </div>
  <div className="text-center mt-10 text-gray-500">
    <p>© 2025 Rentify. All rights reserved.</p>
  </div>
</div>


  );
}

export default Footer;


{/* <div className="bg-gray-900 text-white py-10 px-10 lg:px-4">
<div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-4">
  <div className="footer_left max-w-md">
    <h1 className="text-3xl font-bold text-blue-500 mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>RENTIFY</h1>
    <p className="mt-4 text-gray-400">© 2024 Rentify. All rights reserved.</p>
  </div>

  <div className="footer_center text-gray-400">
    <h3 className="text-xl font-semibold">Useful Links</h3>
    <ul className="mt-4 space-y-2">
      <li className="hover:text-white transition-colors duration-300 cursor-pointer">About Us</li>
      <li className="hover:text-white transition-colors duration-300 cursor-pointer">Terms and Conditions</li>
      <li className="hover:text-white transition-colors duration-300 cursor-pointer">Return and Refund Policy</li>
    </ul>
  </div>

  <div className="footer_right max-w-sm">
    <h3 className="text-xl font-semibold mb-4">Contact</h3>
    <div className="footer_right_info flex items-center mb-4 text-gray-400">
      <FaPhone className="mr-4 text-blue-500" />
      <p>+1 234 567 890</p>
    </div>
    <div className="footer_right_info flex items-center text-gray-400">
      <FaEnvelope className="mr-4 text-blue-500" />
      <p>rentify@support.com</p>
    </div>
    <img src="/assets/payment.png" alt="payment" className="mt-4" />
  </div>
</div>
</div> */}