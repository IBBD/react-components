import { Input as AntInput,
    Select as AntSelect,
    Switch as AntSwith,
    InputNumber as AntInputNumber
} from 'antd';
import { DisabledConsumer } from './DisabledContext';

// const { AntTextArea } = AntInput;

const Input = DisabledConsumer(AntInput)
const Select = DisabledConsumer(AntSelect)
const Switch = DisabledConsumer(AntSwith)
const InputNumber = DisabledConsumer(AntInputNumber)
// const TextArea = DisabledConsumer(AntTextArea)

export { Input, Select, Switch, InputNumber }
// export { Input, Select, Switch, TextArea }
