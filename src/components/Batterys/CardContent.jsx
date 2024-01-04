import Style from "./BatteryCard.style";
import PropTypes from "prop-types";

const CardContent = ({ title, data, unit }) => {
  const displayData = data !== undefined && data !== null ? `${data} ${unit}` : "--";
  return (
    <Style.CardContent>
      <h4>{title} :</h4>
      <p>{displayData}</p>
    </Style.CardContent>
  );
};

CardContent.propTypes = {
  title: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
};

export default CardContent;
