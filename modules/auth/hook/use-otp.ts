// modules/auth/hook/use-otp.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const OTP_LENGTH = 6;
const RESEND_COUNTDOWN = 60;

export const useOtp = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback(() => {
    setCountdown(RESEND_COUNTDOWN);
    setCanResend(false);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resend = useCallback(() => {
    if (!canResend) return;
    setOtp("");
    startCountdown();
    // TODO: call API resend OTP
    console.log("Resend OTP");
  }, [canResend, startCountdown]);

  const submit = useCallback(() => {
    if (otp.length < OTP_LENGTH) return;
    // TODO: call API verify OTP
    console.log("Submit OTP:", otp);
  }, [otp]);

  return {
    otp,
    setOtp,
    countdown,
    canResend,
    resend,
    submit,
    isReady: otp.length === OTP_LENGTH,
  };
};
