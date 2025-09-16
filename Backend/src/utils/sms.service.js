import axios from 'axios';

const sendOtpSms = async (otp, phoneNumber) => {
  try {
    const response = await axios.get(`https://www.fast2sms.com/dev/bulkV2`);

    // Fast2SMS returns return: true on success
    if (response.data.return) {
      console.log('✅ OTP SMS sent successfully.');
      return true;
    } else {
      console.error('❌ Failed to send OTP SMS:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Error with Fast2SMS API:', error.message);
    throw new Error('Could not send OTP.');
  }
};

export  { sendOtpSms }