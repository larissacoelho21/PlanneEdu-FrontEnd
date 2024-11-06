import "../IntroName/TextIntroName.css"

interface IntroFormsProps {
  titleText: string;
  subtitleText: string;
}

export function IntroForms({ titleText, subtitleText }: IntroFormsProps) {
  return (
    <div className="introTextStandard">
      <h1>
        {titleText}
      </h1>
      <h2>{subtitleText}</h2>
    </div>
  );
}
