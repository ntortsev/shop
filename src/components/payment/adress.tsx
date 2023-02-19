import { Form, FormInstance, Select } from 'antd';
import React from 'react';
import adress from '../../store/adress';
import { observer } from 'mobx-react-lite';
import useDebounce from '../../hooks/use-debounce';

type Props = {
  form: FormInstance;
};

type AdressType = {
  value: string;
  unrestricted_value: string;
  data: {
    region_with_type: string;
    fias_level: number;
  };
};

const PaymentAdress: React.FC<Props> = ({ form }) => {
  const { Option } = Select;
  const [currAdress, setCurrAdress] = React.useState('');
  const [fiasLevel, setFiasLevel] = React.useState(0);
  const debouncedAdress = useDebounce<string>(currAdress);

  const handleSelect = (_: string, option: any) => {
    setFiasLevel(+option.fiaslevel);
  };

  const checkFiasLevel = () => {
    return fiasLevel < 8
      ? Promise.reject(new Error('You should to enter the full address'))
      : Promise.resolve();
  };

  const handleChange = (e: string) => {
    setCurrAdress(e);
  };

  const getAdressWithoutRegion = (adress: string, region: string) => {
    return adress
      .split(', ')
      .filter((item) => item !== region)
      .join(', ');
  };

  React.useEffect(() => {
    if (form.getFieldValue(['Adress'])?.length) {
      setFiasLevel(8);
    }
  }, []);

  React.useEffect(() => {
    if (debouncedAdress) {
      adress.fetchAdressList(debouncedAdress);
    }
  }, [debouncedAdress]);

  return (
    <Form.Item
      label="Adress"
      name={'Adress'}
      rules={[{ required: true, validator: checkFiasLevel }]}>
      <Select
        placeholder="Your adress"
        size="large"
        onChange={handleChange}
        onSearch={handleChange}
        onSelect={handleSelect}
        showSearch
        filterOption={false}
        notFoundContent={null}
        loading={adress.isLoading}>
        {adress.list?.map((adress: AdressType) => (
          <Option
            key={adress.unrestricted_value}
            value={adress.unrestricted_value}
            fiaslevel={adress.data.fias_level}>
            {getAdressWithoutRegion(adress.value, adress.data.region_with_type)}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default observer(PaymentAdress);
