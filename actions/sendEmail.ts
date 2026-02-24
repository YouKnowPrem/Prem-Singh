"use server";
import React from "react";
import { Resend } from "resend";
import { getErrorMessage, validateString } from '../lib/utils';

// this is how that exception is handled in the code
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.warn("WARNING: Missing RESEND_API_KEY environment variable. Emails will not be sent.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const sendEmail = async (formData: FormData) => {
  if (!resend) {
    return {
      error: "Contact form is currently disabled. Missing Resend API configuration.",
    };
  }
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if(!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email"
    }
  }

  if(!validateString(message, 5000)) {
    return {
      error: "Invalid message"
    }
  }
  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "thepremsingh2111@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail as string,
      text: message as string,     
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
  return {
    data,  
  };
};
