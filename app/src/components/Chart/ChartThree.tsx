import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { formatNumber, getRandomHexColor, retrieveData } from '../../utils/utils';
import { useQuery } from '@tanstack/react-query';
import { userStore } from '../../store/userStore';
import { PaymentMethod, PaymentStatus } from '../../enums/enums';
import { t } from 'i18next';

interface ChartThreeState {
  series: number[];
}

type PropType = {
  labels: string[],
  value: number[]
}

const ChartThree = () => {

  const colors: string[] = ["#008FFB", "#00E396", "#FEB019", "#FF4560"];
  const token = userStore((state: any) => state.token)
  const [query, setQuery] = useState<string>("all");
  const [state, setState] = useState<ChartThreeState>({
    series: [20, 30, 40, 50],
  });

  const [totalOnline, setTotalOnline] = useState<number>(0)
  const [totalCash, setTotalCash] = useState<number>(0)
  const [totalCheque, setTotalCheque] = useState<number>(0)
  const [totalTransfer, setTotalTransfer] = useState<number>(0)


  const header = {
    Authorization: `Bearer ${token}`,
  }

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['payment_for_chart'],
    queryFn: () => retrieveData(`payment?period=${query}&status=${PaymentStatus.SUCCESS}`, header),
  })

  // console.log("payment data from chart", data)

  useEffect(() => {
    refetch();
  }, [query])

  useEffect(() => {


    const totalCount = data?.length;
    const percents: number[] = []


    const cash = data?.filter((item) => item.payment_method == PaymentMethod.CASH)
    const online = data?.filter((item) => item.payment_method == PaymentMethod.ONLINE)
    const cheque = data?.filter((item) => item.payment_method == PaymentMethod.CHEQUE)
    const transfer = data?.filter((item) => item.payment_method == PaymentMethod.TRANSFER)

    percents.push(parseFloat((cash?.length / totalCount * 100).toFixed(2)))
    percents.push(parseFloat((online?.length / totalCount * 100).toFixed(2)))
    percents.push(parseFloat((cheque?.length / totalCount * 100).toFixed(2)))
    percents.push(parseFloat((transfer?.length / totalCount * 100).toFixed(2)))

    const getTotalAmount = async () => {
      let total_cash = 0;
      let total_online = 0;
      let total_cheque = 0;
      let total_transfer = 0;

      const cashPromises = cash?.map(async (item: any) => {
        return Promise.all(item.payment_details.map((detail: any) => {
          total_cash += detail.amount + detail.penalty_amount;
        }));
      });
      const onlinePromises = online?.map(async (item: any) => {
        return Promise.all(item.payment_details.map((detail: any) => {
          total_online += detail.amount + detail.penalty_amount;
        }));
      });

      const chequePromises = cheque?.map(async (item: any) => {
        return Promise.all(item.payment_details.map((detail: any) => {
          total_cheque += detail.amount + detail.penalty_amount;
        }));
      });

      const transferPromises = transfer?.map(async (item: any) => {
        return Promise.all(item.payment_details.map((detail: any) => {
          total_transfer += detail.amount + detail.penalty_amount;
        }));
      });

      await Promise.all(cashPromises);
      await Promise.all(onlinePromises);
      await Promise.all(chequePromises);
      await Promise.all(transferPromises);

      setTotalCash(total_cash);
      setTotalOnline(total_online);
      setTotalCheque(total_cheque);
      setTotalTransfer(total_transfer)

    }
    getTotalAmount();




    // const paymentPercentages:any = Object.keys(paymentCounts).reduce((acc, paymentMethod) => {
    //   acc[paymentMethod] = (paymentCounts[paymentMethod] / totalCount) * 100;
    //   return acc;
    // }, {});


    setState({ series: percents })

  }, [data])


  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: colors,
    labels: [t('cash'), t('online'), t('cheque'), t('bank_transefer')],
    legend: {
      show: true,
      position: 'bottom',
    },

    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };





  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {t('payments')}
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name=""
              id=""
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
              onChange={(e: any) => setQuery(e.target.value)}
            >
              <option value="all">{t('all_time')}</option>
              <option value="today">{t('today')}</option>
              <option value="this_month">{t('this_month')}</option>
              <option value="this_year">{t('this_year')}</option> 
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <div className='py-5'>
          <h1 className='font-bold text-black dark:text-white'>{t('total_payments')}</h1>
          <h1 className='font-bold text-black dark:text-white'>{formatNumber(totalCash + totalOnline + totalCheque + totalTransfer)} {t('birr')}</h1>
        </div>
        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#008FFB]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{t('cash')}</span>
                <span> {formatNumber(totalCash)} {t('birr')}</span>
              </p>
            </div>
          </div>
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#00E396]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {t('online')} </span>
                <span> {formatNumber(totalOnline)} {t('birr')}</span>
              </p>
            </div>
          </div>
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FEB019]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{t('cheque')}</span>
                <span> {formatNumber(totalCheque)} {t('birr')}</span>
              </p>
            </div>
          </div>
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FF4560]"></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{t('bank_transfer')}</span>
                <span> {formatNumber(totalTransfer)} {t('birr')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
