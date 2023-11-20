"""
Copyright 2019 Jason Hu <awaregit at gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""
import os
import json
import logging
import urllib3

_debug = bool(os.environ.get('DEBUG'))
_logger = logging.getLogger('HomeAssistant-SmartHome')
_logger.setLevel(logging.DEBUG if _debug else logging.INFO)

_base_url = os.environ.get('BASE_URL').strip("/")

http = urllib3.PoolManager(
  cert_reqs='CERT_REQUIRED',
  timeout=urllib3.Timeout(connect=2.0, read=10.0)
)


def handler(event, context):
    if event.get("eventType", "") == "warmer":
      _logger.info('Staying Warm')
      return

    """Handle incoming Alexa directive."""

    _logger.debug('Event: %s', event)

    directive = event.get('directive')
    assert directive is not None, 'Malformatted request - missing directive'
    assert directive.get('header', {}).get('payloadVersion') == '3', \
        'Only support payloadVersion == 3'

    scope = directive.get('endpoint', {}).get('scope')
    if scope is None:
        # token is in grantee for Linking directive
        scope = directive.get('payload', {}).get('grantee')
    if scope is None:
        # token is in payload for Discovery directive
        scope = directive.get('payload', {}).get('scope')
    assert scope is not None, 'Malformatted request - missing endpoint.scope'
    assert scope.get('type') == 'BearerToken', 'Only support BearerToken'

    token = scope.get('token')
    if token is None and _debug:
        token = long_living_token  # only for debug purpose

    response = http.request(
        'POST',
        '{}/api/alexa/smart_home'.format(_base_url),
        headers={
            'Authorization': 'Bearer {}'.format(token),
            'Content-Type': 'application/json',
        },
        body=json.dumps(event).encode('utf-8'),
    )
    decoded_data = response.data.decode("utf-8")
    if response.status >= 400:
        _logger.warn('Response Error: %s', decoded_data)
        return {
            'event': {
                'payload': {
                    'type': 'INVALID_AUTHORIZATION_CREDENTIAL' if response.status in (401, 403) else 'INTERNAL_ERROR',
                    'message': decoded_data,
                }
            }
        }
    else:
        _logger.debug('Response: %s', decoded_data)
    return json.loads(decoded_data)