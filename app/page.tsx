"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from './page.module.scss';
import CTAButton from '@/components/CTAButton/CTAButton';

export default function Home() {
  const router = useRouter();

  return (
    <motion.section
      className={styles.home}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.wrap}>
        <motion.div
          className={styles.txtBox}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <h2>
            지금 이 순간,<br />
            딱 맞는 음악이<br />
            필요하지 않나요?
          </h2>
          <p>
            기분만 알려주세요<br />
            음악은 우리가 준비할게요
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: 0.4, 
          }}
        >
          <CTAButton 
            text="이 순간에 맞는 음악 받기" 
            onClick={() => router.replace('/survey')}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}