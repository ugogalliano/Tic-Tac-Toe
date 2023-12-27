import { Choose } from "../../enum/choose.enum";
import circle from "../../assets/circle.png";
import cross from "../../assets/cross.png";

type Props = {
  player?: string;
  index: number;
  choose: (index: number) => void;
};

export default function Box({ player, choose, index }: Props) {
  const checkValue = () => {
    if (player === Choose.CIRCLE) {
      return (
        <div className="box">
          <img src={circle} />
        </div>
      );
    } else if (player === Choose.CROSS) {
      return (
        <div className="box">
          <img src={cross} />
        </div>
      );
    } else {
      return <div className="box" onClick={() => choose(index)}></div>;
    }
  };

  return <>{checkValue()}</>;
}
