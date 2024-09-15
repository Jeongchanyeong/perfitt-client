import { useState, useMemo } from 'react';
import SUSelect from './SUSelect';
import SUIbtn from './SUIbtn';
import infoicon from '../../../assets/images/icon_info_blue400.png';
import { Controller, useFormContext } from 'react-hook-form';
import { FormValues } from '../../../types/sign';

const SUIdetails = () => {
  const [selectedSizeType, setSelectedSizeType] = useState<string>('');
  const { control, setValue, getValues } = useFormContext<FormValues>();

  const userSizeType = [
    {
      type: 'mm',
      size: {
        female: [220, 270],
        male: [250, 310],
      },
      gap: 5,
    },
    {
      type: 'EU',
      size: {
        female: [35.5, 40.5],
        male: [40, 46],
      },
      gap: 0.5,
    },
    {
      type: 'US',
      size: {
        female: [5, 10],
        male: [7, 13],
      },
      gap: 0.5,
    },
  ];

  const getSizeOptions = (sizeType: string) => {
    const sizeTypeData = userSizeType.find(type => type.type === sizeType);
    if (!sizeTypeData) return [];

    const { female, male } = sizeTypeData.size;
    const { gap } = sizeTypeData;

    const femaleSize = Array.from({ length: Math.floor((female[1] - female[0]) / gap) + 1 }, (_, i) => {
      const size = female[0] + i * gap;
      return sizeType === 'mm' ? `${size} mm / 여성` : `${sizeType} ${size} / 여성`;
    });

    const maleSize = Array.from({ length: Math.floor((male[1] - male[0]) / gap) + 1 }, (_, i) => {
      const size = male[0] + i * gap;
      return sizeType === 'mm' ? `${size} mm / 남성` : `${sizeType} ${size} / 남성`;
    });

    return femaleSize.concat(maleSize);
  };

  const sizeOptions = useMemo(() => getSizeOptions(selectedSizeType), [selectedSizeType]);

  const handleSizeTypeClick = (sizeType: string) => {
    setSelectedSizeType(sizeType);
    const newSizeOptions = getSizeOptions(sizeType);

    if (!newSizeOptions.includes(getValues('usersize'))) {
      setValue('usersize', '');
    }
  };

  return (
    <>
      <div>
        <label className='h-[17px] text-[14px] leading-[17px] font-semibold'>
          사이즈 타입
          <div className='mb-6 flex flex-row gap-2 w-full'>
            <SUIbtn
              title='mm'
              value='mm'
              onClick={() => handleSizeTypeClick('mm')}
              isActive={selectedSizeType === 'mm'}
              className='px-2.5 py-[12.5px]'
            />
            <SUIbtn
              title='EU'
              value='EU'
              onClick={() => handleSizeTypeClick('EU')}
              isActive={selectedSizeType === 'EU'}
              className='px-2.5 py-[12.5px]'
            />
            <SUIbtn
              title='US'
              value='US'
              onClick={() => handleSizeTypeClick('US')}
              isActive={selectedSizeType === 'US'}
              className='px-2.5 py-[12.5px]'
            />
          </div>
        </label>
        <div className='mb-6'>
          <Controller
            name='usersize'
            control={control}
            rules={{ required: { value: true, message: '사이즈를 선택해 주세요' } }}
            render={({ field, fieldState }) => (
              <SUSelect
                label='평소 신는 스니커즈 사이즈'
                optionData={sizeOptions.map(option => ({ key: option, value: option }))}
                className='w-full border border-[#E4E4E7] rounded text-[16px] leading-5 font-semibold placeholder-[#A1A1AA]'
                placeholder='사이즈를 선택해 주세요'
                {...field}
                helperText={fieldState.error?.message || ''}
              />
            )}
          />
        </div>
        <div className='w-full h-[104px] rounded-lg p-4 bg-[#EFF6FF] flex items-start mb-10'>
          <img
            className='w-[24px] h-[24px] mr-2'
            src={infoicon}
            alt='infoicon'
          />
          <p className='text-base font-normal text-[#1D4ED8]'>
            나에게 편한 신발 사이즈를 고려해서 추천사이즈를 알려드리기 위해 평소 신는 스니커즈 사이즈를 받고 있어요.
          </p>
        </div>
      </div>
    </>
  );
};

export default SUIdetails;
