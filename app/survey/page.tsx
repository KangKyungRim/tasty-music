"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from './page.module.scss';
import CTAButton from '@/components/CTAButton/CTAButton';
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import ArrowIcon from "@/components/icons/ArrowIcon";
import PageIntro from "@/components/PageIntro/PageIntro";
import SurveySection from "./components/SurveySection";

export default function Survey() {
  const router = useRouter();
  
  // 처음으로 or 뒤로 갈 때 선택한 옵션 해제될거라고 알려주기
  // 옵션을 하나라도 선택해야 확인 버튼 활성화

  // 확인 버튼
  // const isValid = ;

  const handleNext = () => {
    // router.push("/result");
  };

  return (
    <section className={styles.wrap}>
      <HeaderBar>
        <HeaderBar.Left
          onClick={() => router.replace("/")}
        >
          <ArrowIcon 
            size={12}
          />
          <p>처음으로</p>
        </HeaderBar.Left>
      </HeaderBar>

      <motion.section
        className={styles.survey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <PageIntro 
          title="지금 마음이 어떤 상태인지 알려주세요"
        />

        <SurveySection
          title="오늘은 어떤 분위기인가요?"
          description="음악의 템포와 감정을 조절해요"
          options={[
            { value: "calm", label: "차분한/편안한" },
            { value: "happy", label: "행복한/신나는" },
            { value: "sad", label: "슬픈" },
            { value: "romantic", label: "로맨틱한/사랑스러운" },
            { value: "energetic", label: "에너제틱한/힘나는" },
          ]}
        />

        <SurveySection
          title="지금 뭐 하고 있나요?"
          description="상황에 맞게 추천이 달라져요"
          options={[
            { value: "study", label: "공부 중" },
            { value: "workout", label: "운동 중" },
            { value: "party", label: "파티 중/놀고 있음" },
            { value: "relax", label: "휴식 중/쉬는 중" },
          ]}
        />

        <SurveySection
          title="음악 스타일은 어떤가요?"
          options={[
            { value: "pop", label: "팝" },
            { value: "rock", label: "록" },
            { value: "jazz", label: "재즈" },
            { value: "latin", label: "라틴" },
            { value: "edm", label: "EDM" },
          ]}
        />

        <div className={styles.buttonWrap}>
          <CTAButton 
            // disabled={!isValid}
            onClick={handleNext}
            text="확인"
          />
        </div>  
      </motion.section>
    </section>
  );
}