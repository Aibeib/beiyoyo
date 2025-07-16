
import { Statistic } from 'antd';
const { Timer } = Statistic

type Props = {
  onFinish: () => void
  deadline: number
}
const OneMinuteCountdown = (props: Props) => {
  const { onFinish } = props
  let { deadline = 30000 } = props
  // 设置倒计时结束时间为当前时间 + 1 分钟（60000 毫秒）
  deadline = Date.now() + deadline
  return (
    <Timer
      type="countdown" value={deadline}
      format='s' valueStyle={{ fontSize: 14, color: '#757575' }}
      onFinish={onFinish}
    />
  );
};

export default OneMinuteCountdown;