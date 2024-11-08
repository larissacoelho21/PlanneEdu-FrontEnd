import "../IntroName/TextIntroName.css"

interface IntroProps {
  titleText: string;
  subtitleText: string;
}

export function IntroText({ titleText, subtitleText }: IntroProps) {
  return (
    <div className="introTextStandard">
      <h1>
        {titleText}
      </h1>
      <h2>{subtitleText}</h2>
      <hr />
    </div>
  );
}
