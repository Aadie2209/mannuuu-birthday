import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevIsActive = useRef(isActive);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);

  const recipientName = "Mannuuu Betaaa";
  const senderName = "Aadie Dada";
  const message = 
    `Myy Chotuuu Sa Pyaara Sa Babyyyy 💗🫶🏻🫂,
Mera pyaaraa bacchaaa 💗🫂,
Myy Prettiest Lil Babyyy 🥹💗🫂

Today is your birthdayy and I am quite emotional while writing all this 🫂🥹… coz you’re not just someone I love, you’re someone who matters sooo sooo muchhh to mee 😭💗🫂. You came as Shri Mataji’s gift in my life 🫶🏻, and honestly, I didn’t even realise when we became itnaaaa zyadaa closeee, when this bond grew so deep and this attachment became so strong 💗🥹. It all happened so naturally… jaise dil ne khud hi tumhe apna maan liya ho🫂💗.

You being emotional and childish around me—there’s something so pure, so innocent about you that it literally makes my heart slow down 😭🫂💗. The way you feel things deeply, the way you express yourself without filters… it’s beautiful💗🥹🫶🏻. Meri Jaan 😭🫂, I want you to know that I deeply care for you and truly want to protect you from this cruel world. With me, you’re allowed to be silly, emotional, dramatic, happy, jealous...everything you are 🥹🫶🏻. You never have to hide any part of yourself or any emotion here..be it happiness or sadness(crying as well)😭🫂.

There are so many little things that live in my heart....your voice notes, the songs you put on Insta notes, the letter card that you gave me 💗, our video calls, the way time just disappears when we talk. And those video calls😭🙏🏻 ....your crying(coz of me going away to Indore) that just wouldn’t stop 😭🫂... Even the days before that, every night on video call… the tears, the silence, the emotions😭🫂💗💗. It made me realise how deep our bond is🫶🏻💗, and how important i am for you now😭🫂. As i rightly said ...the "EPITOME of Siblingship". With you I feel needed,I feel responsible in the most honest way possible and yes YOU have had a huge impact on me as a person (bhaisahabb dimaag wala banda emotional ban gya yarrr😭😭🫂🫂). I know you miss me, and trust me, I carry that feeling with a lot of care🥹💗🫂.

My Princess💗🫂, My Sunshine 🫶🏻💗 I love you more than words can properly explain. You are precious to me, you are valued, and you are never alone in this world. Remember Your dada is with you and will be with you HUMESHA..FORVER AND EVER AND EVER AND EVER...😭🫂🧿 
On your birthday, I just want you to remember this: there is someone who truly cares for your heart, your happiness, and your inner child. I am sooo soooo luckyyy and endlessly grateful to have the bestestestesttttt sister ever in my life 😭😭🫂🫂💗.

Wishinggg youu theee Happiesttt Birthdayyy, my pyaara sa baccha 🫶🏻🫂💗. Bhale hi aaj waha tumhare paas nahi huu par yaha se zarur tumhare saath hu aur humesha rahunga🫂🧿.
Loveeeee youuu sooo soooo soooooo muchh myy chotuu sa babyyy 🫂🥹💗🫶🏻

MY WHOLE HEART FOR YOUHHH!! 🫶🏻🥹🫂💗💗

Your big brother — always here, always. 🧿🫂`;

  // Handle page transitions
  useEffect(() => {
    // Only trigger on transition to active
    if (isActive && !prevIsActive.current) {
      setTimeout(() => setShowConfetti(true), 10);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }

    // Reset curtains when leaving page with smooth animation
    if (!isActive && prevIsActive.current) {
      setTimeout(() => {
        setCurtainsOpened(false);

        // Smooth reset animation
        if (curtainLeftRef.current && curtainRightRef.current) {
          const resetTimeline = gsap.timeline();

          resetTimeline.to([curtainLeftRef.current, curtainRightRef.current], {
            opacity: 1,
            duration: 0.3,
          });

          resetTimeline.to(
            [curtainLeftRef.current, curtainRightRef.current],
            {
              x: "0%",
              rotationY: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.3
          );
        }

        if (messageContentRef.current) {
          gsap.to(messageContentRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
          });
        }
      }, 300);
    }

    prevIsActive.current = isActive;
    return undefined;
  }, [isActive]);

  const handleOpenCurtains = () => {
    if (!curtainsOpened) {
      setCurtainsOpened(true);

      // Detect screen size for responsive animations
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;

      // Adjust animation parameters based on screen size
      const duration = isSmallMobile ? 1.2 : isMobile ? 1.4 : 1.5;
      const rotationAngle = isSmallMobile ? 10 : isMobile ? 12 : 15;

      // Animate curtain hint fade out
      gsap.to(curtainHintRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate curtains opening with 3D effect
      const timeline = gsap.timeline();

      timeline.to(
        curtainLeftRef.current,
        {
          x: "-100%",
          rotationY: -rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      timeline.to(
        curtainRightRef.current,
        {
          x: "100%",
          rotationY: rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      // Fade out curtains
      timeline.to(
        [curtainLeftRef.current, curtainRightRef.current],
        {
          opacity: 0,
          duration: 0.5,
          delay: isMobile ? 0.8 : 1,
        },
        0
      );

      // Reveal message content with smooth animation
      timeline.to(
        messageContentRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.8 : 1,
          ease: "back.out(1.2)",
          delay: isMobile ? 0.6 : 0.8,
        },
        0
      );
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    if (!curtainsOpened) {
      // Add subtle scale effect on touch
      gsap.to(curtainHintRef.current, {
        scale: 0.95,
        duration: 0.1,
      });
    }
  };

  const handleTouchEnd = () => {
    if (!curtainsOpened) {
      gsap.to(curtainHintRef.current, {
        scale: 1,
        duration: 0.1,
      });
    }
  };

  return (
    <section className="message">
      <h2>💌 A Message From My Heart</h2>

      <div className="curtain-container">
        <div className="curtain-rod"></div>

        <div
          className={`curtain-wrapper ${
            curtainsOpened ? "opened opening" : ""
          }`}
          onClick={handleOpenCurtains}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={curtainsOpened ? -1 : 0}
          aria-label="Click or tap to open the curtains and reveal the birthday message"
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !curtainsOpened) {
              e.preventDefault();
              handleOpenCurtains();
            }
          }}
        >
          <div ref={curtainLeftRef} className="curtain curtain-left"></div>
          <div ref={curtainRightRef} className="curtain curtain-right"></div>
          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ {window.innerWidth <= 768 ? "Tap" : "Click"} to Open ✨
            </div>
          )}
        </div>

        <div
          ref={messageContentRef}
          className="message-content"
          role="article"
          aria-label="Birthday message"
        >
          <p className="typed-text">{message}</p>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;
