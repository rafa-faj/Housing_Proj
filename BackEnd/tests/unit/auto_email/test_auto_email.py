import unittest
from app.util import auto_email


class Test(unittest.TestCase):
    def test_valid_addresses(self):
        """
        checks if email can be sent to valid address
        """
        response = auto_email.send_email(
            to='tkkim@ucsd.edu', subject='test_valid_addresses', content='', ip_address='ip')
        self.assertTrue(response)

    def test_invalid_address(self):
        """
        checks for invalid email address input
        """
        self.assertRaises(
            ValueError,
            auto_email.send_email,
            to='invalid_address', subject='test_invalid_address', content='', ip_address='ip'
        )

    def test_multiple_addresses(self):
        """
        checks if email can be sent to multiple addresses
        """
        response = auto_email.send_email(
            to=['tkkim@ucsd.edu', 'taekunkim214@gmail.com'], subject='test_multiple_addresses', content='', ip_address='ip')
        self.assertTrue(response)

    def test_invalid_type(self):
        self.assertRaises(ValueError, auto_email.send_email,
                          'tkkim@ucsd.edu', 'test', 'hello', 1)

    def test_cc(self):
        response_1 = auto_email.send_email(
            'tkkim@ucsd.edu', 'cc_test', 'body', 'ip', cc='taekunkim214@gmail.com')
        response_2 = auto_email.send_email('tkkim@ucsd.edu', 'cc_test', 'body', 'ip', cc=[
                                           'taekunkim214@gmail.com', 'lewis0214kim@gmail.com'])
        self.assertTrue(response_1 and response_2)

    def test_bcc(self):
        response_1 = auto_email.send_email(
            'tkkim@ucsd.edu', 'bcc_test', 'body', 'ip', bcc='taekunkim214@gmail.com')
        response_2 = auto_email.send_email('tkkim@ucsd.edu', 'bcc_test', 'body', 'ip', bcc=[
                                           'taekunkim214@gmail.com', 'lewis0214kim@gmail.com'])
        self.assertTrue(response_1 and response_2)

    def test_attachment(self):
        response = auto_email.send_email(
            'tkkim@ucsd.edu', 'attachment_test', 'body', 'ip', attachments='./tests/unit/auto_email/sample_img.png')
        self.assertTrue(response)

    def test_non_existent_attachment(self):
        self.assertRaises(
            ValueError,
            auto_email.send_email,
            to='tkkim@ucsd.edu', subject='test_non_existent_attachment', content='body', ip_address='ip', attachments='./no_file.png'
        )

    def test_non_existent_attachment2(self):
        self.assertRaises(
            ValueError,
            auto_email.send_email,
            to='tkkim@ucsd.edu', subject='test_non_existent_attachment', content='body', ip_address='ip', attachments=['./sample_img.png', './no_file.png']
        )


if __name__ == '__main__':
    unittest.main()
