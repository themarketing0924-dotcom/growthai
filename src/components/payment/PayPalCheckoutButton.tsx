// ============================================================
// PayPal 결제 버튼 컴포넌트
// ============================================================
// 기존 프로젝트(수익화웹사이트첫걸음, globalaieducation)에서
// 검증된 패턴을 기반으로 제작
//
// 사용법:
//   <PayPalCheckoutButton
//     product={product}
//     onSuccess={(details) => console.log('결제 완료', details)}
//     onError={(err) => console.error(err)}
//   />
// ============================================================

import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type { PayPalProduct } from '../../lib/paypal';

interface PayPalCheckoutButtonProps {
  product?: PayPalProduct;
  planId?: string; // 구독 플랜 ID가 전달되면 구독 결제로 작동합니다.
  onSuccess: (details: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

const PayPalCheckoutButton: React.FC<PayPalCheckoutButtonProps> = ({
  product,
  planId,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  if (isRejected) {
    return (
      <div className="w-full max-w-md mx-auto rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-[13px] text-red-300">
        해외 결제(PayPal) 연결에 실패했습니다. 국내 결제를 이용하시거나 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="w-full max-w-md mx-auto h-[50px] rounded-lg bg-gray-600/50 flex items-center justify-center text-white/60 text-[14px]">
        PayPal 로딩 중...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: planId ? 'subscribe' : 'paypal',
          height: 50,
          tagline: false,
        }}
        createSubscription={
          planId
            ? (_data, actions) => {
                return actions.subscription.create({
                  plan_id: planId,
                });
              }
            : undefined
        }
        createOrder={
          !planId && product
            ? (_data, actions) => {
                return actions.order.create({
                  intent: 'CAPTURE',
                  purchase_units: [
                    {
                      description: product.description,
                      custom_id: product.id,
                      amount: {
                        currency_code: product.currency,
                        value: product.price,
                        breakdown: {
                          item_total: {
                            currency_code: product.currency,
                            value: product.price,
                          },
                        },
                      },
                      items: [
                        {
                          name: product.name,
                          unit_amount: {
                            currency_code: product.currency,
                            value: product.price,
                          },
                          quantity: '1',
                          category: 'DIGITAL_GOODS' as const,
                        },
                      ],
                    },
                  ],
                  application_context: {
                    brand_name: 'AI Marketing Academy',
                    shipping_preference: 'NO_SHIPPING' as const,
                    user_action: 'PAY_NOW' as const,
                  },
                });
              }
            : undefined
        }
        onApprove={async (data, actions) => {
          if (planId) {
            // 구독 결제 승인 완료
            onSuccess(data);
          } else if (actions.order) {
            // 단건 결제 승인 완료
            const details = await actions.order.capture();
            onSuccess(details);
          }
        }}
        onError={(err) => {
          console.error('[PayPal] Error:', err);
          onError?.(err);
        }}
        onCancel={() => {
          onCancel?.();
        }}
      />
    </div>
  );
};

export default PayPalCheckoutButton;
