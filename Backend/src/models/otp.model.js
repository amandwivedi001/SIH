import bcrypt from 'bcryptjs';

// This file exports a function that will be called by the central models/index.js
export default (sequelize, DataTypes) => {
  const Otp = sequelize.define("Otp", {
    otp_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: { // Changed from 'phone'
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    otp: {
      type: DataTypes.STRING, // This will store the HASHED OTP
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    // We don't need the default timestamps (createdAt, updatedAt) for the OTP table
    timestamps: false
  });

  /**
   * A "hook" that runs before a new OTP record is saved.
   * It automatically hashes the plaintext OTP so we never store it directly.
   * This is a critical security practice.
   */
  Otp.beforeSave(async (otpInstance) => {
    if (otpInstance.changed('otp')) {
      const salt = await bcrypt.genSalt(10);
      otpInstance.otp = await bcrypt.hash(otpInstance.otp, salt);
    }
  });

  return Otp;
};

  const generateOtp = () => {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  const isMatchOtp = async function (otp, hashedOtp) {
    return await bcrypt.compare(otp, hashedOtp);
  }

  export { generateOtp, isMatchOtp }