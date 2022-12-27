import { AccountService } from './account.service';
import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Account } from 'app/model/account.model';
import { Pagination } from 'app/model/pagination.model';

@Component({
    selector: 'app-account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.css']
})

export class AccountComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private _accountSerivce: AccountService,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    accounts$: Observable<Account[]>;

    pagination: Pagination;
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    search: string = "";
    selectedAccount: Account | null = null;
    selectedAccountForm: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    ngOnInit() {
        this.loadAccounts();
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // PRIVATE METHOD
    private loadAccounts(): void {
        this._accountSerivce.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: Pagination) => {
                this.pagination = pagination;
                this._changeDetectorRef.markForCheck();
            });
        this.accounts$ = this._accountSerivce.accounts$;
    }

}
