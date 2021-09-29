import { HhData } from './../top-page/top-page.model';
import { HhResponse } from './hh.models';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CLUSTER_FIND_ERROR, SALARY_CLUSTER_ID } from './hh.const';

@Injectable()
export class HhService {
  constructor(private readonly httpService: HttpService) {}

  async getData(text: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get('/vacancies', { params: { text, clusters: true } }),
      );

      return this.parseData(data);
    } catch (e) {
      Logger.error(e);
    }
  }

  private parseData(data: HhResponse): HhData {
    const salaryCluster = data.clusters.find((cluster) => cluster.id === SALARY_CLUSTER_ID);

    if (!salaryCluster) throw new Error(CLUSTER_FIND_ERROR);

    const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
    const middleSalary = this.getSalaryFromString(
      salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name,
    );
    const seniorSalary = this.getSalaryFromString(
      salaryCluster.items[salaryCluster.items.length - 1].name,
    );

    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
      updatedAt: new Date(),
    };
  }

  private getSalaryFromString(salary: string): number {
    const numberRegExp = /(\d+)/g;

    const res = salary.match(numberRegExp);

    if (!res) return 0;

    return +res[0];
  }
}
