import {  Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SortsType } from '../../core/types/types';
import { sortItems } from '../../core/redux/reducers/domains-reducer';
import AddDomainButton from '../Buttons/AddDomainButton';
import SearchInput from '../Inputs/SearchInput';
import SortSelector from './SortSelector';

export const HeaderSection = () => {
    // Redux variables
    const state = useSelector((store: any) => store.domains);
    const dispatch = useDispatch()

    // Render & Show total domains length at <h1 />
    const DomainsLength = () => {
        return <span>{state.isUsingFilters ? `(${state.filteredDomains?.length})` : `(${state.domains?.length})`}</span>;
    };



    return (
        <div>
            <div>
                <h1 className="text-4xl">
                    Domains <DomainsLength />
                </h1>

                <div className="mt-4 flex items-center justify-between">
                    <AddDomainButton />
                    <div className="flex items-center gap-3">
                        <SortSelector />
                        <SearchInput />
                    </div>
                </div>
            </div>
            <section></section>
        </div>
    );
};