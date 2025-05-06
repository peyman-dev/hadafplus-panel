import { Button, Input, message, Radio } from 'antd';
import React, { useState } from 'react';
import { DomainAddType, DomainType } from '../../core/types/types';
import SelectActiveRadio from './SelectActiveRadio';
import { useForm } from 'react-hook-form';
import { domainUrlValidation } from '../../core/validations/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import WithErrorHandling from '../HOC/WithErrorHandling';
import { sendRequest } from '../../core/axios';
import useDrawer from '../../core/hooks/use-drawer';
import { useDispatch } from 'react-redux';
import { addDomain, getDomains } from '../../core/redux/actions';
import { AppDispatch } from '../../core/redux/store';
import { useToast } from '../../core/hooks/use-toast';

const AddDomainUI = () => {
    const { closeDrawer } = useDrawer()
    const dispatch = useDispatch<AppDispatch>()
    const messageApi = useToast()
    const { handleSubmit, watch, register, setValue, formState: { errors } } = useForm({
        defaultValues: {
            domain: '',
        },
        resolver: zodResolver(domainUrlValidation),
    });
    const [isActive, setIsActive] = useState(true);
    const [isPending, setIsPending] = useState(false);

    const isDomainWrong = watch('domain').length && errors?.domain?.message ? true : false;

    const onSubmit = async (values: any) => {
        closeDrawer()
        const hideProgress = messageApi.loading({
            content: "Adding the domain ...",
            duration: 0,
        })
        setIsPending(true);
        try {
            const payload: DomainAddType = {
                _id: crypto.randomUUID(),
                createdDate: Date.now(),
                domain: values.domain,
                isActive,
                status: "pending"
            }

            const request: any = await dispatch(addDomain(payload))
            const { payload: Response } = JSON.parse(JSON.stringify(request))

            if (Response?.status === 201) {
                messageApi.success('Domain added successfully.', 3);
                hideProgress()
            } else {
                hideProgress()
                messageApi.error(`Something went wrong ... \n Better to call peyman `, 2500);
            }
        } catch (error) {
            await new Promise(resolve => setTimeout(resolve, 500));
            messageApi.error(`Something went wrong ...`, 2500);
        } finally {
            hideProgress()
            setIsPending(false);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2 className="text-2xl font-normal">Add domain</h2>
                {/* Input fields */}
                <div className="mt-5 space-y-3">
                    <WithErrorHandling message={errors.domain?.message}>
                        <Input
                            status={isDomainWrong ? 'error' : ''}
                            onChange={(e) => {
                                setValue('domain', e.target.value);
                            }}
                            placeholder="Ex: https://example.by.peyman.co"
                        />
                    </WithErrorHandling>
                    <SelectActiveRadio onSave={setIsActive} />
                </div>
            </div>
            {/* Footer field */}
            <section className="flex gap-3 items-center justify-end max-h-max">
                <Button>Cancel</Button>
                <Button loading={isPending} htmlType="submit" variant="solid" color="blue">
                    Add
                </Button>
            </section>
        </form >
        </>
    );
};

export default AddDomainUI;