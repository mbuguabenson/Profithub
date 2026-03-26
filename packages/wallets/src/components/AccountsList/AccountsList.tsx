import React, { FC, useCallback } from 'react';
import { useIsEuRegion } from '@deriv/api-v2';
import { useTranslations } from '@deriv-com/translations';
import { Divider, Tab, Tabs, useDevice } from '@deriv-com/ui';
import { CFDPlatformsList } from '../../features';
import { OptionsAndMultipliersListing } from '../OptionsAndMultipliersListing';
import { WalletsTabsLoader } from '../SkeletonLoader';
import './AccountsList.scss';

type TProps = {
    accountsActiveTabIndex?: number;
    onTabClickHandler?: React.Dispatch<React.SetStateAction<number>>;
};

const AccountsList: FC<TProps> = ({ accountsActiveTabIndex, onTabClickHandler }) => {
    const { isDesktop } = useDevice();
    const { localize } = useTranslations();
    const { data: isEuRegion, isLoading: isEuRegionLoading } = useIsEuRegion();

    const optionsAndMultipliersTabTitle = isEuRegion ? localize('Multipliers') : localize('Options');

    const tabs = [localize('CFDs'), optionsAndMultipliersTabTitle];

    const onChangeTabHandler = useCallback((activeTab: number) => onTabClickHandler?.(activeTab), [onTabClickHandler]);

    if (isDesktop)
        return (
            <div className='wallets-accounts-list' data-testid='dt_desktop_accounts_list'>
                <div className='wallets-accounts-list__content'>
                    <OptionsAndMultipliersListing />
                </div>
            </div>
        );

    if (isEuRegionLoading && !isDesktop) {
        return (
            <div className='wallets-accounts-list'>
                <WalletsTabsLoader />
            </div>
        );
    }

    return (
        <div className='wallets-accounts-list__tabs'>
            <OptionsAndMultipliersListing />
            <Divider className='wallets-accounts-list__divider' color='var(--wallets-banner-border-color)' />
        </div>
    );
};

export default AccountsList;
