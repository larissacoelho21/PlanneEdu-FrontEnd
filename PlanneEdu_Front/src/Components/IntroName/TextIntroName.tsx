import "../IntroName/TextIntroName.css"

interface TextsIntroProps {
  userName?: string;
  titleText: string;
  subtitleText: string;
}

export function TextsIntroName({ userName, titleText, subtitleText }: TextsIntroProps) {
  return (
    <div className="introTextStandard">
      <h1>
        {titleText}, {userName || "Usuário"}
      </h1>
      <h2>{subtitleText}</h2>
      <hr />
    </div>
  );
}
