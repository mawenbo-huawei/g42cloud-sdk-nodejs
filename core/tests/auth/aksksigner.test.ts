/*
 * Copyright 2023 G42 Technologies Co.,Ltd.
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AKSKSigner } from '../../auth/AKSKSigner';
describe('aksksinger test', () => {
    describe('CanonicalURI', () => {
        test('should return encoded uri', () => {
            const inputUri = '/test1/test2/test3/';
            const expectedOutput = '/test1/test2/test3/';
            expect(AKSKSigner["CanonicalURI"](inputUri)).toBe(expectedOutput);
        });

        test('should return empty uri', () => {
            const inputUri = undefined;
            const expectedOutput = undefined;
            expect(AKSKSigner['CanonicalURI'](inputUri)).toBe(expectedOutput);
        });

        test('should return encoded uri with special characters encoded', () => {
            const inputUri = '/test1 test2/test3%test4?test5=foo#test6=bar';
            const expectedOutput = '/test1%20test2/test3%25test4%3Ftest5%3Dfoo%23test6%3Dbar/';
            expect(AKSKSigner["CanonicalURI"](inputUri)).toBe(expectedOutput);
        });

        test('should return encoded uri with special characters encoded', () => {
            const inputUri = 'urn:fss:cn-north-4:086cd4ee9e00268e2f76c00ea33b6cbe:function:default:testph123:!t123';
            const expectedOutput = 'urn%3Afss%3Acn-north-4%3A086cd4ee9e00268e2f76c00ea33b6cbe%3Afunction%3Adefault%3Atestph123%3A%21t123/';
            expect(AKSKSigner["CanonicalURI"](inputUri)).toBe(expectedOutput);
        });
    });

    describe('buildCanonicalHeaders', () => {
        it('should return empty string when no headers provided', () => {
            const headers = {};
            const expectedOutput = "";
            expect(AKSKSigner['buildCanonicalHeaders'](headers)).toBe(expectedOutput);
        });

        it('should return expected output when headers provided', () => {
            const headers = {
                'Content-Type': 'application/json',
                'x-custom-header': 'custom value',
                'authorization': 'Bearer token'
            };
            const expectedOutput = "authorization:Bearer token\ncontent-type:application/json\nx-custom-header:custom value\n";
            expect(AKSKSigner['buildCanonicalHeaders'](headers)).toBe(expectedOutput);
        });

        test('should return headers be unencoded', () => {
            const headers = {
                'X-Test-Header1': 'value1',
                'X-Test-Header2': 'value2',
                'X-Test-Header3': 'value3 with space'
            };
            const expectedOutput = 'x-test-header1:value1\nx-test-header2:value2\nx-test-header3:value3 with space\n';
            expect(AKSKSigner['buildCanonicalHeaders'](headers)).toBe(expectedOutput);
        });
    });

    describe('CanonicalQueryString', () => {
        it('should return empty string when no query parameters provided', () => {
            const request = { queryParams: {} };
            const expectedOutput = "";
            expect(AKSKSigner['CanonicalQueryString'](request)).toBe(expectedOutput);
        });

        it('should return expected output when query parameters provided', () => {
            const request = {
                queryParams: {
                    'foo': 'bar',
                    'baz': 'qux',
                    'fruits': ['apple', 'orange', 'banana']
                }
            };
            const expectedOutput = "baz=qux&foo=bar&fruits=apple&fruits=banana&fruits=orange";
            expect(AKSKSigner['CanonicalQueryString'](request)).toBe(expectedOutput);
        });

        test('should return encoded query string', () => {
            const queryParams = {
                'test1': 'value1',
                'test2': 'value2 with space',
                'test3': '特殊字符#&'
            };
            const expectedOutput = 'test1=value1&test2=value2%20with%20space&test3=%E7%89%B9%E6%AE%8A%E5%AD%97%E7%AC%A6%23%26';
            expect(AKSKSigner['CanonicalQueryString']({ queryParams })).toBe(expectedOutput);
        });
    });
});