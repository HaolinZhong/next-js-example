'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';


export default function Search({ placeholder }: { placeholder: string }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // 使用npm i use-debounce安装库, 调用防抖函数来避免每次输入都查询数据库
    const handleSearch = useDebouncedCallback((term: String) => {
        //URLSearchParams是一个Web API，它提供了操作URL查询参数的实用方法。您可以使用它来获取参数字符串
        const params = new URLSearchParams(searchParams);
        // 当用户键入新的搜索查询时，您希望将页码重置为1
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        // ${pathname}是当前路径
        // 当用户键入搜索栏时，params.toString()会将此输入转换为URL友好格式。
        // replace(${pathname}?${params.toString()})用用户的搜索数据更新URL。例如，/dashboard/invoices?query=lee如果用户搜索"Lee"。
        // 由于Next.js的客户端导航URL无需重新加载页面即可更新。
        replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
            handleSearch(e.target.value);
        }}
        // 为确保输入字段与URL同步并在共享时填充，您可以通过读取searchParams将defaultValue传递给输入
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
