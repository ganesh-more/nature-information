import "./basic-info-section.css"

function InfoSection(oProps) {
  const text = oProps.info && oProps.info.text;
  let sClassName = oProps.wrapperClassName ? oProps.wrapperClassName + " infoSectionWrapper" : " infoSectionWrapper";
  return (
      <div className={sClassName}>
        <p>{text}</p>
      </div>
  );
}

export default InfoSection;
