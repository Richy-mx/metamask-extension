import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { I18nContext } from '../../../contexts/i18n';
import Typography from '../../ui/typography/typography';
import {
  FONT_WEIGHT,
  TYPOGRAPHY,
  COLORS,
} from '../../../helpers/constants/design-system';
import AdvancedGasControlsRow from './advanced-gas-controls-row.component';

export default function AdvancedGasControls({
  estimateToUse,
  gasFeeEstimates,
  maxPriorityFee,
  maxFee,
  setMaxPriorityFee,
  setMaxFee,
  onManualChange,
  gasLimit,
  setGasLimit,
  gasPrice,
  setGasPrice,
  maxPriorityFeeFiat,
  maxFeeFiat,
}) {
  const t = useContext(I18nContext);

  const suggestedMaxPriorityFeePerGas =
    gasFeeEstimates?.[estimateToUse]?.suggestedMaxPriorityFeePerGas;
  const suggestedMaxFeePerGas =
    gasFeeEstimates?.[estimateToUse]?.suggestedMaxFeePerGas;

  return (
    <div className="advanced-gas-controls">
      <AdvancedGasControlsRow
        titleText={t('gasLimit')}
        onChange={setGasLimit}
        tooltipText=""
        titleDetailText=""
        value={gasLimit}
        autoFocus
      />
      {process.env.SHOW_EIP_1559_UI ? (
        <>
          <AdvancedGasControlsRow
            titleText={t('maxPriorityFee')}
            tooltipText=""
            onChange={(value) => {
              setMaxPriorityFee(value);
              onManualChange?.();
            }}
            value={maxPriorityFee}
            detailText={maxPriorityFeeFiat}
            titleDetailText={
              suggestedMaxPriorityFeePerGas && (
                <>
                  <Typography
                    tag="span"
                    color={COLORS.UI4}
                    variant={TYPOGRAPHY.H8}
                    fontWeight={FONT_WEIGHT.BOLD}
                  >
                    {t('gasFeeEstimate')}:
                  </Typography>{' '}
                  <Typography
                    tag="span"
                    color={COLORS.UI4}
                    variant={TYPOGRAPHY.H8}
                  >
                    {
                      gasFeeEstimates?.[estimateToUse]
                        ?.suggestedMaxPriorityFeePerGas
                    }
                  </Typography>
                </>
              )
            }
          />
          <AdvancedGasControlsRow
            titleText={t('maxFee')}
            tooltipText=""
            onChange={(value) => {
              setMaxFee(value);
              onManualChange?.();
            }}
            value={maxFee}
            detailText={maxFeeFiat}
            titleDetailText={
              suggestedMaxFeePerGas && (
                <>
                  <Typography
                    tag="span"
                    color={COLORS.UI4}
                    variant={TYPOGRAPHY.H8}
                    fontWeight={FONT_WEIGHT.BOLD}
                  >
                    {t('gasFeeEstimate')}:
                  </Typography>{' '}
                  <Typography
                    tag="span"
                    color={COLORS.UI4}
                    variant={TYPOGRAPHY.H8}
                  >
                    {gasFeeEstimates?.[estimateToUse]?.suggestedMaxFeePerGas}
                  </Typography>
                </>
              )
            }
          />
        </>
      ) : (
        <>
          <AdvancedGasControlsRow
            titleText={t('gasPrice')}
            onChange={setGasPrice}
            tooltipText=""
            titleDetailText=""
            value={gasPrice}
          />
        </>
      )}
    </div>
  );
}

AdvancedGasControls.propTypes = {
  estimateToUse: PropTypes.oneOf(['high', 'medium', 'low']),
  gasFeeEstimates: PropTypes.oneOf([
    PropTypes.shape({
      gasPrice: PropTypes.string,
    }),
    PropTypes.shape({
      low: PropTypes.object,
      medium: PropTypes.object,
      high: PropTypes.object,
      estimatedBaseFee: PropTypes.string,
    }),
  ]),
  setMaxPriorityFee: PropTypes.func,
  setMaxFee: PropTypes.func,
  maxPriorityFee: PropTypes.number,
  maxFee: PropTypes.number,
  onManualChange: PropTypes.func,
  gasLimit: PropTypes.number,
  setGasLimit: PropTypes.func,
  gasPrice: PropTypes.number,
  setGasPrice: PropTypes.func,
  maxPriorityFeeFiat: PropTypes.string,
  maxFeeFiat: PropTypes.string,
};
