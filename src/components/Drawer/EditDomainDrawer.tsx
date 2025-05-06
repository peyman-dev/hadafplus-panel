import React, { useState } from 'react';
import { DomainType, ResponseType } from '../../core/types/types';
import { Button, Input, message } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { domainUpdateValidation } from '../../core/validations/domain';
import WithErrorHandling from '../HOC/WithErrorHandling';
import { useDispatch } from 'react-redux';
import { updateDomain } from '../../core/redux/actions';
import { AppDispatch } from '../../core/redux/store';
import { useToast } from '../../core/hooks/use-toast';
import useDrawer from '../../core/hooks/use-drawer';
import SelectActiveRadio from './SelectActiveRadio';

const EditDomainDrawer = ({ domain }: { domain: DomainType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    getValues,
    setValue,
    formState: { errors },
    register,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      ...domain,
    },
    resolver: zodResolver(domainUpdateValidation),
  });

  const isDomainMissing = !watch('domain')?.length;
  const fire = useToast()

  const [isActive, setIsActive] = useState(domain.isActive)
  const { closeDrawer } = useDrawer()

  const onSubmit = async (values: any) => {
    closeDrawer()
    const hideMessage = fire.loading('Updating the domain ...');
    try {
      setIsLoading(true);
      const req = await dispatch(updateDomain({
        ...values,
        isActive,
        id: String(domain.id)
      }));

      const res: any = await req.payload


      if (res?.status === 200) {
        fire.success('Domain updated successfully!');
      } else if (res.status === 400) {
        fire.error(res.message);
      } else {
        fire.error('Failed to update domain.');
      }
    } catch (error) {
      fire.error('An error occurred while updating the domain.');
    } finally {
      hideMessage();
      setIsLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="size-full flex flex-col justify-between"
    >
      <div>
        <h3>
          <span className="text-2xl">Edit Domain</span>
        </h3>
        <div className="mt-5 space-y-3">
          <WithErrorHandling message={errors.domain?.message}>
            <Input
              status={isDomainMissing ? 'error' : ''}
              value={watch('domain')}
              placeholder="Enter the domain ..."
              onChange={(e) => setValue('domain', e.target.value)}
            />
          </WithErrorHandling>

          <SelectActiveRadio defaultValue={isActive} onSave={setIsActive}/>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button>Cancel</Button>
        <Button
          loading={isLoading}
          htmlType="submit"
          variant="solid"
          color="blue"
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditDomainDrawer;