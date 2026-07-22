import { useEffect } from "react";

type WelcomeScreenProps = {
  welcomeText: string | null;
  onHide: () => void;
};

function WelcomeScreen({ welcomeText, onHide }: WelcomeScreenProps) {
  useEffect(() => {
    if (!welcomeText) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onHide();
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [welcomeText, onHide]);

  if (!welcomeText) {
    return null;
  }

  const letters = welcomeText.split(" ").map((word) => word.split(""));

  return (
    <div id="welcomeDiv">
      {letters.map((word, indexa) => (
        <div className="testerowski" key={indexa}>
          <p className="fs-1 fs-md-2 fs-lg-3">
            {word.map((letter, indexb) => (
              <span className="spanWelcome" key={indexb}>
                {letter}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default WelcomeScreen;
